#[allow(duplicate_alias, unused_use, unused_const, unused_variable)]
module lovelink::character {
    use std::string::{Self, String, utf8};
    use sui::package::{Self, Publisher};
    use sui::display::{Self, Display};
    use sui::event;
    use walrus::blob::{Self, Blob};

    const NOT_OWNER: u64 = 1;
    
    public struct CHARACTER has drop {}

    public struct Character has key, store {
        id: UID,
        owner: address,
        image_url: Blob,
        name: String,
        appearance: vector<String>, // 外貌
        personality: vector<String>,    // 性格
        background: String, // 家庭状况
        wealth: vector<String>, // 经济状况
        culture: String, // 学历
        dating_count: u64, // 约会次数
    }

    public struct CharacterCreated has copy, drop {
        owner: address,
        character: address
    }

    fun init(otw: CHARACTER, ctx: &mut TxContext) {
        let keys: vector<String> = vector[
            utf8(b"name"),   
            utf8(b"image_url"),             
            utf8(b"owner"),   
        ];

        let values: vector<String> = vector[
            utf8(b"Character"),
            utf8(b"{image_url}"),
            utf8(b"{owner}"),
        ]; 

        let publisher: Publisher = package::claim(otw, ctx);
        let mut display: Display<Character> = display::new_with_fields(&publisher, keys, values, ctx);

        display::update_version(&mut display);

        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_transfer(display, tx_context::sender(ctx));
    }

    public entry fun create_character(
        image_url: Blob,
        name: String,
        appearance: vector<String>,
        personality: vector<String>,
        background: String,
        wealth: vector<String>,
        culture: String,
        dating_count: u64,
        ctx: &mut TxContext,
    ) {
        let owner = tx_context::sender(ctx);
        let uid = object::new(ctx);
        let id = object::uid_to_inner(&uid);

        let character: Character = Character {
            id: uid,
            owner: tx_context::sender(ctx),
            image_url,
            name,
            appearance,
            personality,
            background,
            wealth,
            culture,
            dating_count: 0,
        };
        transfer::transfer(character, owner);

        event::emit(CharacterCreated {
            owner,
            character: object::id_to_address(&id)
        })
    }


    public entry fun add_dating(character: &mut Character, ctx: &mut TxContext) {
        assert!(tx_context::sender(ctx) == character.owner, NOT_OWNER);
        character.dating_count = character.dating_count + 1;
    }
}





