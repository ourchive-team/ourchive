#[test_only]
module ourchive::user_manager_tests {
    use std::string;
    use ourchive::user_manager;
    
    #[test(test_addr = @ourchive)]
    fun test_unregistered_user_nickname_is_empty(test_addr: signer) {
        user_manager::publish_user_store(&test_addr);
        assert!(string::is_empty(&user_manager::get_user_nickname(@0x1)), 0);
    }

    #[test(test_addr = @ourchive)]
    fun test_registered_user_nickname(test_addr: signer) {
        let test_nickname = string::utf8(b"Ourchive");
        user_manager::publish_user_store(&test_addr);
        user_manager::set_user_nickname(@0x1, test_nickname);
        assert!(user_manager::get_user_nickname(@0x1) == test_nickname, 0);
    }

    #[test(test_addr = @ourchive)]
    #[expected_failure]
    fun test_register_user_nickname_twice(test_addr: signer) {
        let test_nickname1 = string::utf8(b"I Love Ourchive");
        user_manager::publish_user_store(&test_addr);
        user_manager::set_user_nickname(@0x1, test_nickname1);

        let test_nickname2 = string::utf8(b"I want Ourchive");
        user_manager::set_user_nickname(@0x1, test_nickname2);
    }
}
