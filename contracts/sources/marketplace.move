module ourchive::marketplace {
    use std::vector;
    use std::signer;
    use std::string::String;

    use aptos_std::table::{Self, Table};
    use aptos_token::token::{TokenDataId, TokenId};
    use aptos_framework::account::SignerCapability;

    struct MarketDataStore has key {
        creator_info_table: Table<address, CreatorInfoRecord>,
        image_price_table: Table<TokenDataId, ImagePrice>,
        creator_uploaded_images: Table<address, vector<TokenDataId>>,
        user_purchased_images: Table<address, vector<TokenId>>,
    }

    struct CreatorInfoRecord has store {
        nickname: String,
        collection_name: String,
        signer_cap: SignerCapability,
    }
    
    struct ImagePrice has store {
        value: u64,
    }

    fun init_module(resource_signer: &signer) {
        let account_addr = signer::address_of(resource_signer);

        if (!exists<MarketDataStore>(account_addr)) {
            move_to(resource_signer, MarketDataStore {
                creator_info_table: table::new(),
                image_price_table: table::new(),
                creator_uploaded_images: table::new(),
                user_purchased_images: table::new(),
            });
        }
    }

    public fun uploaded_image(
        creator: &signer,
        creator_nickname: String,
        image_title: String,
        description: String,
        price: u64,
    ) acquires MarketDataStore {
        let creator_info_table = &mut borrow_global_mut<MarketDataStore>(@ourchive).creator_info_table;
    }

    public fun get_all_images(): vector<TokenDataId> acquires MarketDataStore {
        let result = vector::empty<TokenDataId>();
        let market_data_store = borrow_global<MarketDataStore>(@ourchive);

        result
    }

    public fun purchase_image(
        user: &signer,
        creator_address: address,
        image_title: String,
        size: String,
        period: u64,
    ) acquires MarketDataStore {
        let user_purchased_images = &mut borrow_global_mut<MarketDataStore>(@ourchive).user_purchased_images;
    }
    
    public fun get_uploaded_images(creator: &signer): vector<TokenDataId> acquires MarketDataStore {
        let creator_uploaded_images = &borrow_global<MarketDataStore>(@ourchive).creator_uploaded_images;
        
        *table::borrow(creator_uploaded_images, signer::address_of(creator))
    }

    public fun get_purchased_images(user: &signer): vector<TokenId> acquires MarketDataStore {
        let user_purchased_images = &borrow_global<MarketDataStore>(@ourchive).user_purchased_images;

        *table::borrow(user_purchased_images, signer::address_of(user))
    }
}
