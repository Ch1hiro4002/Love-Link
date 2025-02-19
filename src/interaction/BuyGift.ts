import { Transaction } from "@mysten/sui/transactions";
import { networkConfig, suiClient} from "../networkConfig";
import { GiftBag, Gift } from "../type/type";


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

export const BuyGift = async(name: string, description: string, image_url: string, data: any, giftBag: any, price: number) => {
    const packageID = networkConfig.testnet.packageID;
    const tx = new Transaction();
    const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(price)]);
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
    });

    tx.transferObjects([coin], "0x2ea10ce1ea376a44c37b1a77d781ecb8023c58132a893d7c856da71df0616d09");

    return tx;
}