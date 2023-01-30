module ourchive::user_manager {
    use std::string::String;
    use aptos_std::table::Table;

    // Represent each user's information for Ourchive
    struct UserStore has key {
        nicknames: Table<address, String>,
    }
}
