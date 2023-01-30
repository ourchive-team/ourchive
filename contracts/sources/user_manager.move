module ourchive::user_manager {
    use std::vector;
    use std::signer;
    use std::string::{Self, String};

    use aptos_std::table::{Self, Table};

    // Represent each user's information for Ourchive
    struct UserStore has key {
        nicknames: Table<address, String>,
    }

    fun init_module(resource_signer: &signer) {
        let account_addr = signer::address_of(resource_signer);

        if (!exists<UserStore>(account_addr)) {
            move_to(resource_signer, UserStore { 
                nicknames: table::new()
            });
        }
    }

    public fun get_user_nickname(user_address: address): String acquires UserStore {
        let nicknames = &borrow_global<UserStore>(@ourchive).nicknames;
        if (table::contains(nicknames, user_address)) {
            *table::borrow(nicknames, user_address)
        } else {
            string::utf8(vector::empty<u8>())
        }
    }

    entry public fun set_user_nickname(user_address: address, user_nickname: String) acquires UserStore {
        let user_store = borrow_global_mut<UserStore>(@ourchive);
        assert!(!table::contains(&user_store.nicknames, user_address), 0);
        table::add(&mut user_store.nicknames, user_address, user_nickname);
    }

    #[test_only]
    public fun publish_user_store(account: &signer) {
        move_to(account, UserStore{ nicknames: table::new() });
    }
}
