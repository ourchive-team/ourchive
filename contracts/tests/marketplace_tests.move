#[test_only]
module ourchive::marketplace_tests {
    use std::signer;
    use std::string;
    use std::vector;

    use aptos_framework::account;
    use aptos_token::token::{TokenId, TokenDataId};
    use aptos_framework::coin::{Self, FakeMoney};
    
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
        
        let uploaded_images = marketplace::get_uploaded_images(signer::address_of(creator));
        assert!(vector::length<TokenDataId>(&uploaded_images) == 2, 0);
    }
    
    #[test(owner = @ourchive, creator = @0xCA, user = @0xFE, aptos=@aptos_framework)]
    fun test_purchase_image(owner: &signer, creator: &signer, user: &signer, aptos: &signer) {
        account::create_account_for_test(signer::address_of(owner));
        account::create_account_for_test(signer::address_of(creator));
        account::create_account_for_test(signer::address_of(user));
        account::create_account_for_test(signer::address_of(aptos));
        marketplace::publish_market_data_store(owner);

        let nickname = string::utf8(b"Ourchive");
        let image_title = string::utf8(b"Ourchive Lover");
        let description = string::utf8(b"For testing!");
        let uri = string::utf8(b"http://ourchive.com");
        let price = 10;
        marketplace::upload_image(creator, nickname, image_title, description, uri, price);

        coin::create_fake_money(aptos, user, 100);
        coin::transfer<FakeMoney>(aptos, signer::address_of(user), 100);
        coin::register<FakeMoney>(creator);

        marketplace::purchase_image_for_test(user, signer::address_of(creator), nickname, image_title, 3, 20230203);

        let purchased_images = marketplace::get_purchased_images(signer::address_of(user));
        assert!(vector::length<TokenId>(&purchased_images) == 1, 0);
    }

    #[test(owner = @ourchive, creator = @0xCA, user = @0xFE)]
    #[expected_failure]
    fun test_purchase_image_insufficient_balance(owner: &signer, creator: &signer, user: &signer) {
        account::create_account_for_test(signer::address_of(owner));
        account::create_account_for_test(signer::address_of(creator));
        account::create_account_for_test(signer::address_of(user));
        marketplace::publish_market_data_store(owner);

        let nickname = string::utf8(b"Ourchive");
        let image_title = string::utf8(b"Ourchive Lover");
        let description = string::utf8(b"For testing!");
        let uri = string::utf8(b"http://ourchive.com");
        let price = 10;
        marketplace::upload_image(creator, nickname, image_title, description, uri, price);

        coin::register<FakeMoney>(user);
        marketplace::purchase_image_for_test(user, signer::address_of(creator), nickname, image_title, 3, 20230203);
    }

    #[test(owner = @ourchive, creator = @0xCA, user = @0xFE)]
    #[expected_failure]
    fun test_purchase_image_without_register(owner: &signer, creator: &signer, user: &signer) {
        account::create_account_for_test(signer::address_of(owner));
        account::create_account_for_test(signer::address_of(creator));
        account::create_account_for_test(signer::address_of(user));
        marketplace::publish_market_data_store(owner);

        let nickname = string::utf8(b"Ourchive");
        let image_title = string::utf8(b"Ourchive Lover");
        let description = string::utf8(b"For testing!");
        let uri = string::utf8(b"http://ourchive.com");
        let price = 10;
        marketplace::upload_image(creator, nickname, image_title, description, uri, price);

        marketplace::purchase_image_for_test(user, signer::address_of(creator), nickname, image_title, 3, 20230203);
    }
}
