module ourchive::marketplace {
    use std::signer;
    use std::string::String;

    use aptos_std::table::{Self, Table};
    use aptos_token::token::{TokenDataId, TokenId};
    use aptos_framework::account::SignerCapability;

    struct MarketDataStore has key {
        creator_info_table: Table<address, CreatorInfoRecord>,
        image_price_table: Table<TokenDataId, ImagePrice>,
        creator_upload_images: Table<address, vector<TokenDataId>>,
        user_owned_images: Table<address, vector<TokenId>>,
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
                creator_upload_images: table::new(),
                user_owned_images: table::new(),
            });
        }
    }
    
}
