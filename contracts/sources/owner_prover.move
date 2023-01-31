module ourchive::owner_prover {
    use std::signer;
    use std::string::String;
    
    use aptos_std::table::{Self, Table};
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

    fun init_module(resource_signer: &signer) {
        let account_addr = signer::address_of(resource_signer);

        if (!exists<OwnerProverStore>(account_addr)) {
            move_to(resource_signer, OwnerProverStore {
                creator_report_list: table::new(),
                user_proof_list: table::new(),
            });
        };
    }

}
