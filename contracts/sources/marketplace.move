module ourchive::marketplace {
    use std::vector;
    use std::signer;
    use std::error;
    use std::bcs;
    use std::string::{Self, String};

    use aptos_std::simple_map::{Self, SimpleMap};
    use aptos_std::table::{Self, Table};
    use aptos_token::token::{Self, TokenDataId, TokenId};
    use aptos_framework::account::{Self, SignerCapability};
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;

    #[test_only]
    use aptos_framework::coin::FakeMoney;

    const EINSUFFICIENT_BALANCE: u64 = 1;
    const EINVALID_USER_ADDRESS: u64 = 2;

    struct MarketDataStore has key {
        creator_info_table: Table<address, CreatorInfoRecord>,
        creator_uploaded_images_table: Table<address, vector<TokenDataId>>,
        user_purchased_images_table: Table<address, vector<TokenId>>,
        image_price_table: SimpleMap<TokenDataId, ImagePrice>,
        resource_to_creator: SimpleMap<address, address>,
    }

    struct CreatorInfoRecord has store {
        nickname: String,
        collection_name: String,
        signer_cap: SignerCapability,
    }

    struct ImagePrice has store, copy, drop {
        amount: u64,
    }
    
    fun init_module(resource_signer: &signer) {
        let account_addr = signer::address_of(resource_signer);

        if (!exists<MarketDataStore>(account_addr)) {
            move_to(resource_signer, MarketDataStore {
                creator_info_table: table::new(),
                creator_uploaded_images_table: table::new(),
                user_purchased_images_table: table::new(),
                image_price_table: simple_map::create(),
                resource_to_creator: simple_map::create(),
            });
        }
    }

    entry public fun upload_image(
        creator: &signer,
        creator_nickname: String,
        image_title: String,
        description: String,
        image_uri: String,
        image_price: u64,
    ) acquires MarketDataStore {
        let market_data_store = borrow_global_mut<MarketDataStore>(@ourchive);
        let creator_info_table = &mut market_data_store.creator_info_table;
        let creator_address = signer::address_of(creator);
        let seed = x"01";

        // For a new creator
        if (!table::contains(creator_info_table, creator_address)) {
            let (resource_signer, resource_cap) = account::create_resource_account(creator, seed);
            let creator_collection_name = copy creator_nickname;
            string::append(&mut creator_collection_name, string::utf8(b"'s Collection"));

            table::add(creator_info_table, creator_address, CreatorInfoRecord {
                nickname: creator_nickname,
                collection_name: creator_collection_name,
                signer_cap: resource_cap,
            });
            token::create_collection(&resource_signer, creator_collection_name, string::utf8(b""), string::utf8(b""), 0, vector<bool>[ false, false, false]);

            let resource_to_creator = &mut market_data_store.resource_to_creator;
            simple_map::add(resource_to_creator, signer::address_of(&resource_signer), creator_address);
        };

        let creator_info = table::borrow(creator_info_table, creator_address);
        let resource_signer = account::create_signer_with_capability(&creator_info.signer_cap);
        // Create a token data
        let upload_image = token::create_tokendata(
            &resource_signer,
            creator_info.collection_name,
            image_title,
            description,
            0,
            image_uri,
            creator_address,
            1,
            0,
            // enable mutation for properties by setting the last boolean in the vector to true.
            token::create_token_mutability_config(
                &vector<bool>[ false, false, false, false, true ]
            ),
            vector::empty<String>(),
            vector::empty<vector<u8>>(),
            vector::empty<String>(),
        );

        // Add the image data to the creator's uploaded image list
        let uploaded_images_table = &mut market_data_store.creator_uploaded_images_table;
        if (!table::contains(uploaded_images_table, creator_address)) {
            table::add(uploaded_images_table, creator_address, vector::empty<TokenDataId>());
        };
        let uploaded_images = table::borrow_mut(uploaded_images_table, creator_address);
        vector::push_back(uploaded_images, upload_image);

        // Save the image data with its price to the price table
        let image_price_table = &mut market_data_store.image_price_table;
        simple_map::add(image_price_table, upload_image, ImagePrice { amount: image_price });
    }

    entry public fun purchase_image(
        user: &signer,
        creator_address: address,
        creator_nickname: String,
        image_title: String,
        size: u64,
        expired_date: u64,
    ) acquires MarketDataStore {
        purchase_image_internal<AptosCoin>(
            user,
            creator_address,
            creator_nickname,
            image_title,
            size,
            expired_date,
        );
    }

    fun purchase_image_internal<CoinType>(
        user: &signer,
        creator_address: address,
        creator_nickname: String,
        image_title: String,
        size: u64,
        expired_date: u64,
    ) acquires MarketDataStore {
        let user_addr = signer::address_of(user);
        let market_data_store = borrow_global_mut<MarketDataStore>(@ourchive);
        let creator_info = table::borrow(&market_data_store.creator_info_table, creator_address);
        let resource_signer = account::create_signer_with_capability(&creator_info.signer_cap);
        let resource_address = signer::address_of(&resource_signer);
        
        // Check the user's balance
        let image_id = get_image_id(resource_address, creator_nickname, image_title);
        let price = simple_map::borrow(&market_data_store.image_price_table, &image_id);
        assert!(coin::balance<CoinType>(user_addr) > price.amount, error::invalid_argument(EINSUFFICIENT_BALANCE));

        // Buy and sell the image
        let image_token_id = token::mint_token(&resource_signer, copy image_id, 1);
        token::direct_transfer(&resource_signer, user, image_token_id, 1);
        coin::transfer<CoinType>(user, creator_address, price.amount);

        // Update the token property
        // Size: Large(3), Medium(2), Small(1)
        // Expired Date Format: YYYYMMDD (e.g. 20230203)
        token::mutate_one_token(
            &resource_signer,
            user_addr,
            image_token_id,
            vector<String>[string::utf8(b"size"), string::utf8(b"expired_date")],
            vector<vector<u8>>[bcs::to_bytes<u64>(&size), bcs::to_bytes<u64>(&expired_date)],
            vector<String>[string::utf8(b"u64"), string::utf8(b"u64")],
        );

        // Update the user's purchased image list
        let purchased_images_table = &mut market_data_store.user_purchased_images_table;
        if (!table::contains(purchased_images_table, user_addr)) {
            table::add(purchased_images_table, user_addr, vector::empty<TokenId>());
        };
        let purchased_images = table::borrow_mut(purchased_images_table, user_addr);
        vector::push_back(purchased_images, image_token_id);
    }
    
    #[view]
    public fun get_image_id(creator_address: address, creator_nickname: String, image_title: String): TokenDataId {
        token::create_token_data_id(
            creator_address,
            get_collection_name(creator_nickname),
            image_title,
        )
    }

    #[view]
    public fun get_collection_name(creator_nickname: String): String {
        let result = creator_nickname;
        string::append(&mut result, string::utf8(b"'s Collection"));
        
        result
    }

    #[view]
    public fun get_all_images(): SimpleMap<TokenDataId, ImagePrice> acquires MarketDataStore {
        let market_data_store = borrow_global<MarketDataStore>(@ourchive);
        market_data_store.image_price_table
    }

    #[view]
    public fun get_uploaded_images(creator_addr: address): vector<TokenDataId> acquires MarketDataStore {
        let creator_uploaded_images = &borrow_global<MarketDataStore>(@ourchive).creator_uploaded_images_table;
        
        *table::borrow(creator_uploaded_images, creator_addr)
    }

    #[view]
    public fun get_purchased_images(user_addr: address): vector<TokenId> acquires MarketDataStore {
        let user_purchased_images = &borrow_global<MarketDataStore>(@ourchive).user_purchased_images_table;

        *table::borrow(user_purchased_images, user_addr)
    }

    #[test_only]
    public fun publish_market_data_store(account: &signer) {
        move_to(account, MarketDataStore {
            creator_info_table: table::new(),
            creator_uploaded_images_table: table::new(),
            user_purchased_images_table: table::new(),
            image_price_table: simple_map::create(),
            resource_to_creator: simple_map::create(),
        });
    }

    #[test_only]
    public fun purchase_image_for_test(
        user: &signer,
        creator_address: address,
        creator_nickname: String,
        image_title: String,
        size: u64,
        expired_date: u64,
    ) acquires MarketDataStore {
        purchase_image_internal<FakeMoney>(
            user,
            creator_address,
            creator_nickname,
            image_title,
            size,
            expired_date,
        );
    }
}
