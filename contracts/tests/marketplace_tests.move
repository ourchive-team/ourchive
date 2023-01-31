#[test_only]
module ourchive::marketplace_tests {
    use std::signer;
    use std::string;
    use std::vector;

    use aptos_framework::account;
    use aptos_token::token::TokenDataId;
    use ourchive::marketplace;

    #[test(owner = @ourchive, creator = @0xCA)]
    fun test_upload_image(owner: &signer, creator: &signer) {
        account::create_account_for_test(signer::address_of(owner));
        account::create_account_for_test(signer::address_of(creator));
        marketplace::publish_market_data_store(owner);

        let nickname = string::utf8(b"Ourchive");
        let image_title = string::utf8(b"Ourchive Lover");
        let description = string::utf8(b"For testing!");
        let uri = string::utf8(b"http://ourchive.com");
        let price = 10;
        marketplace::upload_image(creator, nickname, image_title, description, uri, price);
        
        let nickname2 = string::utf8(b"Ourchive2");
        let image_title2 = string::utf8(b"Ourchive2 Lover");
        marketplace::upload_image(creator, nickname2, image_title2, description, uri, price);
        
        let uploaded_images = marketplace::get_uploaded_images(creator);
        assert!(vector::length<TokenDataId>(&uploaded_images) == 2, 0);
    }

}
