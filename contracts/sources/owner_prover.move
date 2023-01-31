module ourchive::owner_prover {
    use std::vector;
    use std::signer;
    use std::string::{Self, String};
    
    use aptos_std::table::{Self, Table};
    use aptos_std::simple_map::{Self, SimpleMap};
    use aptos_token::token::{Self, TokenDataId};

    use ourchive::marketplace;

    struct OwnerProverStore has key {
        creator_report_table: Table<String, SimpleMap<String, ReportElement>>,
        user_proof_table: Table<String, vector<ProofElement>>,
    }

    struct ReportElement has store, drop {
        image: TokenDataId,
        proved: bool,
    }
    
    struct ProofElement has store, drop {
        image: TokenDataId,
        phrase: String,
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
        let reported_image = find_image(&uploded_images, creator_address, &image_title);
        let reports = table::borrow_mut(creator_report_table, creator_nickname);
        if (!simple_map::contains_key(reports, &phrase)) {
            simple_map::add(reports, phrase, ReportElement {
                image: reported_image,
                proved: false,
            });
        };
    }

    fun find_image(images: &vector<TokenDataId>, addr: address, title: &String): TokenDataId {
        let result = token::create_token_data_id(
            addr,
            string::utf8(b""),
            string::utf8(b""),
        );
        let i = 0;

        while (i < vector::length(images)) {
            let image = vector::borrow(images, i);
            let (creator, _, name) = token::get_token_data_id_fields(image);
            if (creator == addr && &name == title) {
                result = *image;
                break
            };
            i = i + 1;
        };
        result
    }
}
