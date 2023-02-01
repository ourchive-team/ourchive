#[test_only]
module ourchive::owner_prover_tests {
    use std::vector;
    use std::signer;
    use std::string::{Self, String};

    use aptos_std::simple_map;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use aptos_framework::coin::{Self, FakeMoney};
    
    use ourchive::marketplace;
    use ourchive::owner_prover;

    fun setup_owner(owner: &signer) {
        account::create_account_for_test(signer::address_of(owner));
        marketplace::publish_market_data_store(owner);
        owner_prover::publish_owner_prover_store(owner);
    }

    fun setup_creator(creator: &signer) {
        account::create_account_for_test(signer::address_of(creator));
        coin::register<FakeMoney>(creator);

        let creator_url = string::utf8(b"http://ourchive.com");
        let description = string::utf8(b"Testing");
        let price = 0;

        marketplace::upload_image(
            creator, 
            creator_nickname(), 
            image_title_purchased(),
            description,
            creator_url,
            price,
        );

        marketplace::upload_image(
            creator,
            creator_nickname(),
            image_title_not_purchased(),
            description,
            creator_url,
            price,
        )
    }

    fun setup_user(user: &signer, creator: &signer, aptos: &signer) {
        account::create_account_for_test(signer::address_of(user));
        account::create_account_for_test(signer::address_of(aptos));
        coin::create_fake_money(aptos, user, 10);
        coin::transfer<FakeMoney>(aptos, signer::address_of(user), 10);

        marketplace::purchase_image_for_test(
            user,
            signer::address_of(creator),
            creator_nickname(),
            image_title_purchased(),
            3,
            20230203
        );
    }

    fun creator_nickname(): String {
        string::utf8(b"ourchive")
    }

    fun user_nickname(): String {
        string::utf8(b"Aptos Lover")
    }

    fun image_title_purchased(): String {
        string::utf8(b"Ourchive Lover")
    }
    
    fun image_title_not_purchased(): String {
        string::utf8(b"Ourchive Hater")
    }

    #[test(owner = @ourchive, creator = @0xCA, aptos = @aptos_framework)]
    fun test_submit_report(owner: &signer, creator: &signer, aptos: &signer) {
        timestamp::set_time_has_started_for_testing(aptos);
        setup_owner(owner);
        setup_creator(creator);

        let phrase = string::utf8(b"Test");

        owner_prover::submit_report(
            creator,
            creator_nickname(),
            image_title_purchased(),
            phrase,
        );

        let report_list = owner_prover::get_report_list(creator_nickname());
        assert!(simple_map::length(&report_list) == 1, 0);

        let report_element = simple_map::borrow(&report_list, &phrase);
        assert!(!owner_prover::report_was_proved(report_element), 0);
        assert!(owner_prover::report_has_same_image(report_element, &image_title_purchased()), 0);
    }
    
    #[test(owner = @ourchive, creator = @0xCA, aptos = @aptos_framework)]
    #[expected_failure]
    fun test_submit_report_invalid_image_title(owner: &signer, creator: &signer, aptos: &signer) {
        timestamp::set_time_has_started_for_testing(aptos);
        setup_owner(owner);
        setup_creator(creator);

        let phrase = string::utf8(b"Test");

        owner_prover::submit_report(
            creator,
            creator_nickname(),
            string::utf8(b"not available"),
            phrase,
        );
    }

    #[test(owner = @ourchive, creator = @0xCA, user = @0xFE, aptos = @aptos_framework)]
    fun test_prove_ownership(owner: &signer, creator: &signer, user: &signer, aptos: &signer) {
        timestamp::set_time_has_started_for_testing(aptos);
        setup_owner(owner);
        setup_creator(creator);
        setup_user(user, creator, aptos);
        
        let phrase = string::utf8(b"Test");
        let image_title = image_title_purchased();

        owner_prover::submit_report(
            creator,
            creator_nickname(),
            image_title,
            phrase,
        );

        owner_prover::prove_ownership(
            user,
            user_nickname(),
            creator_nickname(),
            image_title,
            phrase,
        
        );
        let proof_list = owner_prover::get_proof_list(user_nickname());
        assert!(vector::length(&proof_list) == 1, 0);

        let proof_element = vector::borrow(&proof_list, 0);
        assert!(owner_prover::proof_has_same_phrase(proof_element, &phrase), 0);
        assert!(owner_prover::proof_has_same_image(proof_element, &image_title), 0);
        
        let report_list = owner_prover::get_report_list(creator_nickname());
        assert!(simple_map::length(&report_list) == 1, 0);

        let report_element = simple_map::borrow(&report_list, &phrase);
        assert!(owner_prover::report_was_proved(report_element), 0);
        assert!(owner_prover::report_has_same_image(report_element, &image_title), 0);
    }
    
    #[test(owner = @ourchive, creator = @0xCA, user = @0xFE, aptos = @aptos_framework)]
    #[expected_failure]
    fun test_prove_ownership_incorrect_creator(owner: &signer, creator: &signer, user: &signer, aptos: &signer) {
        timestamp::set_time_has_started_for_testing(aptos);
        setup_owner(owner);
        setup_creator(creator);
        setup_user(user, creator, aptos);
        
        let phrase = string::utf8(b"Test");
        let image_title = image_title_purchased();

        owner_prover::submit_report(
            creator,
            creator_nickname(),
            image_title,
            phrase,
        );

        owner_prover::prove_ownership(
            user,
            user_nickname(),
            string::utf8(b"Different Creator"),
            image_title,
            phrase,
        
        );
    }
    
    #[test(owner = @ourchive, creator = @0xCA, user = @0xFE, aptos = @aptos_framework)]
    #[expected_failure]
    fun test_prove_ownership_incorrect_phrase(owner: &signer, creator: &signer, user: &signer, aptos: &signer) {
        timestamp::set_time_has_started_for_testing(aptos);
        setup_owner(owner);
        setup_creator(creator);
        setup_user(user, creator, aptos);
        
        let phrase = string::utf8(b"Test");
        let image_title = image_title_purchased();

        owner_prover::submit_report(
            creator,
            creator_nickname(),
            image_title,
            phrase,
        );

        owner_prover::prove_ownership(
            user,
            user_nickname(),
            creator_nickname(),
            image_title,
            string::utf8(b"Incorrect"),
        );
    }
    
    #[test(owner = @ourchive, creator = @0xCA, user = @0xFE, aptos = @aptos_framework)]
    #[expected_failure]
    fun test_prove_ownership_incorrect_image_title(owner: &signer, creator: &signer, user: &signer, aptos: &signer) {
        timestamp::set_time_has_started_for_testing(aptos);
        setup_owner(owner);
        setup_creator(creator);
        setup_user(user, creator, aptos);
        
        let phrase = string::utf8(b"Test");
        let image_title = image_title_purchased();

        owner_prover::submit_report(
            creator,
            creator_nickname(),
            image_title,
            phrase,
        );

        owner_prover::prove_ownership(
            user,
            user_nickname(),
            creator_nickname(),
            string::utf8(b"Incorrect Image"),
            phrase,
        );
    }
    
    #[test(owner = @ourchive, creator = @0xCA, user = @0xFE, aptos = @aptos_framework)]
    #[expected_failure]
    fun test_prove_ownership_not_purchased(owner: &signer, creator: &signer, user: &signer, aptos: &signer) {
        timestamp::set_time_has_started_for_testing(aptos);
        setup_owner(owner);
        setup_creator(creator);
        setup_user(user, creator, aptos);
        
        let phrase = string::utf8(b"Test");
        let image_title = image_title_not_purchased();

        owner_prover::submit_report(
            creator,
            creator_nickname(),
            image_title,
            phrase,
        );

        owner_prover::prove_ownership(
            user,
            user_nickname(),
            creator_nickname(),
            image_title,
            phrase,
        );
    }
}
