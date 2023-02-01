module ourchive::owner_prover {
    use std::vector;
    use std::signer;
    use std::error;
    use std::string::String;
    use std::option::{Self, Option};
    
    use aptos_framework::timestamp;
    use aptos_std::table::{Self, Table};
    use aptos_std::simple_map::{Self, SimpleMap};
    use aptos_token::token::{Self, TokenDataId};

    use ourchive::marketplace;

    const EINVALID_CREATOR_NICKNAME: u64 = 1;
    const EINCORRECT_PHRASE: u64 = 2;
    const EINCORRECT_IMAGE_TITLE: u64 = 3;
    const EUSER_NOT_IMAGE_OWNER: u64 = 4;

    struct OwnerProverStore has key {
        creator_report_table: Table<String, SimpleMap<String, ReportElement>>,
        user_proof_table: Table<String, vector<ProofElement>>,
    }

    struct ReportElement has store, drop, copy {
        image: TokenDataId,
        proved: bool,
        timestamp: u64,
    }
    
    struct ProofElement has store, drop, copy {
        image: TokenDataId,
        phrase: String,
        timestamp: u64,
    }

    fun init_module(resource_signer: &signer) {
        let account_addr = signer::address_of(resource_signer);

        if (!exists<OwnerProverStore>(account_addr)) {
            move_to(resource_signer, OwnerProverStore {
                creator_report_table: table::new(),
                user_proof_table: table::new(),
            });
        };
    }
    
    entry public fun submit_report(
        creator: &signer,
        creator_nickname: String,
        image_title: String,
        phrase: String,
    ) acquires OwnerProverStore {
        let creator_report_table = &mut borrow_global_mut<OwnerProverStore>(@ourchive).creator_report_table;

        if (!table::contains(creator_report_table, creator_nickname)) {
            table::add(creator_report_table, creator_nickname, simple_map::create());
        };

        let creator_address = signer::address_of(creator);
        let uploded_images = marketplace::get_uploaded_images(creator_address);
        let reported_image = find_image(&uploded_images, &image_title);
        assert!(!option::is_none(&reported_image), EINCORRECT_IMAGE_TITLE);
        let reports = table::borrow_mut(creator_report_table, creator_nickname);
        if (!simple_map::contains_key(reports, &phrase)) {
            simple_map::add(reports, phrase, ReportElement {
                image: option::extract(&mut reported_image),
                proved: false,
                timestamp: timestamp::now_seconds(),
            });
        };
    }

    fun find_image(images: &vector<TokenDataId>, title: &String): Option<TokenDataId> {
        let result = option::none<TokenDataId>();
        let i = 0;

        while (i < vector::length(images)) {
            let image = vector::borrow(images, i);
            let (_, _, name) = token::get_token_data_id_fields(image);
            if (&name == title) {
                result = option::some<TokenDataId>(*image);
                break
            };
            i = i + 1;
        };
        result
    }

    entry public fun prove_ownership(
        user: &signer,
        user_nickname: String,
        creator_nickname: String,
        image_title: String,
        phrase: String,
    ) acquires OwnerProverStore {
        let owner_prover_store = borrow_global_mut<OwnerProverStore>(@ourchive);

        // Get the creator's report list
        let creator_report_table = &mut owner_prover_store.creator_report_table;
        assert!(table::contains(creator_report_table, creator_nickname), error::invalid_argument(EINVALID_CREATOR_NICKNAME));

        // Check the phrase
        let creator_report_map = table::borrow_mut(creator_report_table, creator_nickname);
        assert!(simple_map::contains_key(creator_report_map, &phrase), error::invalid_argument(EINCORRECT_PHRASE));

        // Check the image title
        let creator_report = simple_map::borrow_mut(creator_report_map, &phrase);
        let (_, _, report_image_name) = token::get_token_data_id_fields(&creator_report.image);
        assert!(report_image_name == image_title, error::invalid_argument(EINCORRECT_IMAGE_TITLE));

        // Check if the image is in the user's purchase list
        let user_address = signer::address_of(user);
        assert!(check_user_purchase_image(user_address, &creator_report.image), EUSER_NOT_IMAGE_OWNER);

        let user_proof_table = &mut owner_prover_store.user_proof_table;
        if (!table::contains(user_proof_table, user_nickname)) {
            table::add(user_proof_table, user_nickname, vector::empty<ProofElement>());
        };
        let user_proof_list = table::borrow_mut(user_proof_table, user_nickname);
        vector::push_back(user_proof_list, ProofElement {
            image: creator_report.image,
            phrase: phrase,
            timestamp: timestamp::now_seconds(),
        });
        creator_report.proved = true;
    }

    fun check_user_purchase_image(user_address: address, image_id: &TokenDataId): bool {
        let result = false;
        let i = 0;
        let (image_creator, image_collection, image_title) = token::get_token_data_id_fields(image_id);
        let purchased_images = &marketplace::get_purchased_images(user_address);

        while (i < vector::length(purchased_images)) {
            let purchased_image = vector::borrow(purchased_images, i);
            let (creator, collection, name, _ ) = token::get_token_id_fields(purchased_image);
            if (creator == image_creator &&
                image_collection == collection &&
                image_title == name) {
                result = true;
                break
            };
            i = i + 1;
        };
        result
    }

    #[view]
    public fun get_report_list(creator_nickname: String): SimpleMap<String, ReportElement> acquires OwnerProverStore {
        let creator_report_table = &borrow_global<OwnerProverStore>(@ourchive).creator_report_table;

        *table::borrow(creator_report_table, creator_nickname)
    }

    #[view]
    public fun get_proof_list(user_nickname: String): vector<ProofElement> acquires OwnerProverStore {
        let user_proof_table = &borrow_global<OwnerProverStore>(@ourchive).user_proof_table;

        *table::borrow(user_proof_table, user_nickname)
    }
}
