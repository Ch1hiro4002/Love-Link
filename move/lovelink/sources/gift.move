#[allow(unused_use, unused_field, unused_variable)]
module lovelink::gift {
    use std::string::{Self, String, utf8};
    use sui::package::{Self, Publisher};
    use sui::display::{Self, Display};
    use sui::event;

    const NOT_OWNER: u64 = 1;

    public struct GIFT has drop {}

    public struct Gift has key, store {
        id: UID,
        name: String,
        description: String,
        effect: u64,
        owner: address,
        image_url: String
    }

    public struct GiftCreated has copy, drop {
        owner: address,
        gift: address
    }

    public struct GiftSent has copy, drop {
        sender: address,
        gift_name: String,
        gift_description: String,
        gift_effect: u64
    }

    fun init(otw: GIFT, ctx: &mut TxContext) {
        let keys: vector<String> = vector[
            utf8(b"name"),   
            utf8(b"image_url"),             
            utf8(b"owner"),   
        ];

        let values: vector<String> = vector[
            utf8(b"Gift"),
            utf8(b"{image_url}"),
            utf8(b"{owner}"),
        ]; 

        let publisher: Publisher = package::claim(otw, ctx);
        let mut display: Display<Gift> = display::new_with_fields(&publisher, keys, values, ctx);

        display::update_version(&mut display);

        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_transfer(display, tx_context::sender(ctx)); 
    }

   public entry fun create_gift(name: String, description: String, effect : u64, image_url: String, ctx: &mut TxContext) {
        let owner = tx_context::sender(ctx);

        let uid = object::new(ctx);
        let id = object::uid_to_inner(&uid);

        let gift = Gift {
            id: uid,
            name,
            description,
            effect,
            owner,
            image_url,
        };

        transfer::transfer(gift, owner);

        event::emit(GiftCreated {
            owner,
            gift: object::id_to_address(&id)
        })
    }

    public entry fun send_gift(gift: Gift, ctx: &mut TxContext) {
        assert!(tx_context::sender(ctx) == gift.owner, NOT_OWNER);

        let Gift {
            id,
            name,
            description,
            effect ,
            owner,
            image_url: _
        } = gift;

        object::delete(id);

        event::emit(GiftSent {
            sender: owner,
            gift_name: name,
            gift_description: description,
            gift_effect: effect
        });
    }
}