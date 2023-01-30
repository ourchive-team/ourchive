module ourchive::marketplace {
    use std::string::String;

    use aptos_std::table::Table;
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
    
}
