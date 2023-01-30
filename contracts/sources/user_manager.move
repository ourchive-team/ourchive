module ourchive::user_manager {
    use std::signer;
    use std::string::String;

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
}
