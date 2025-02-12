import { Transaction } from "@mysten/sui/transactions";
import { networkConfig, suiClient} from "../networkConfig";
import { GiftBag, Gift } from "../type/struct_type";


export const queryGiftBag = async () => {
    const events = await suiClient.queryEvents({
        query: {
            MoveEventType: `${networkConfig.testnet.packageID}::gift::GiftCreated`
        }
    })

    const giftBag: GiftBag = {
        gifts:[]
    } 
 
    events.data.map((event)=>{
        const gift = event.parsedJson as Gift;
        giftBag.gifts.push(gift);
    })
    return giftBag;
}

export const buyGift = async(name: string, description: string, image_url: string, data: any, giftBag: any) => {
    const packageID = networkConfig.testnet.packageID;

    const tx = new Transaction();
    tx.moveCall({
        package: packageID,
        module: "gift",
        function: "create_gift",
        arguments: [
            tx.pure.string(name),
            tx.pure.string(description),
            tx.pure.string(image_url),
            tx.pure.u64(data),
            tx.object(giftBag)
        ]
    })

    return tx;
}