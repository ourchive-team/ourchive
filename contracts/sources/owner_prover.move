module ourchive::owner_prover {
    use std::string::String;
    
    use aptos_std::table::Table;
    use aptos_std::simple_map::SimpleMap;
    use aptos_token::token::TokenDataId;

    struct OwnerProverStore has key {
        creator_report_list: Table<String, SimpleMap<String, ReportElement>>,
        user_proof_list: Table<String, vector<ProofElement>>,
    }

    struct ReportElement has store, drop {
        image: TokenDataId,
        proved: bool,
    }

    struct ProofElement has store, drop {
        image: TokenDataId,
        phrase: String,
    }
}
