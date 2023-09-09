import express from "express";

const smsRouter = express.Router();

smsRouter.post('/sms', async (req, res) => {

    let textData = req.body.Body
    let dataArr = textData.split(" ")
    let senderNumber = req.body.From


    // Encoding
    function encodePasscode(passcode) {
        const encoded = Buffer.from(passcode).toString("base64");
        return encoded;
    }

    // Decoding
    function decodePasscode(encodedPasscode) {
        return Buffer.from(encodedPasscode, "base64").toString("utf8");
    }

    // Start our TwiML response.

    // pay <<recipient> <amt> <static pw> <encrypted_dynamic_pw>
    if (dataArr[0] == "pay" && dataArr.length == 5) {
        let recipientNum = dataArr[1]
        let amt = dataArr[2]
        let static_pw = dataArr[3]
        let encrypted_dynamic_pw = dataArr[4]
            
        // var bytes  = CryptoJS.AES.decrypt(encrypted_dynamic_pw, process.env.ENCRYPT_SECRET_KEY);
        var originalDynamicPw = decodePasscode(encrypted_dynamic_pw)
        var tempSender = await prisma.user.findFirst({
            where: {balance: {gte: parseFloat(amt)}, staticPw: static_pw, phoneNumber: senderNumber }
        })
        console.log(tempSender)
        var sender
        if (tempSender.dynamicPw != "") {
            sender = await prisma.user.findFirst({
                where: {balance: {gte: parseFloat(amt)}, staticPw: static_pw, phoneNumber: senderNumber, dynamicPw: originalDynamicPw }
            })
        } else {
            sender = tempSender;
        }


        const receiver = await prisma.user.findFirst({
            where: { phoneNumber: recipientNum }
        })

        const nonce = Math.random() * 100
        const encryptedNewMsg = encodePasscode([nonce])
        if (receiver && sender) {
            await prisma.$transaction([
                prisma.user.update({
                    where: {
                        phoneNumber: senderNumber, 
                        dynamicPw: String(originalDynamicPw), 
                        id: sender.id
                    }, 
                    data: {
                        balance: {
                            decrement: parseFloat(amt)
                        }, 
                        dynamicPw: String(nonce)
                    }
                }), 
    
                prisma.user.update({
                    where: { phoneNumber: recipientNum, id: receiver.id }, 
                    data: { balance: {
                        increment: parseFloat(amt)
                    } }
                }), 
    
                prisma.transaction.create({
                    data: {
                        buyerId: sender.id, 
                        sellerId: receiver.id, 
                        amount: parseFloat(amt), 
                        description: "", 
                    }
                })
            ]).then(
                x => {
                        // Start our TwiML response.
                        const twiml = new MessagingResponse();
    
                        // Add a text message.
                        const msg = twiml.message(`Transaction successful! ${amt} sent to ${recipientNum}. your new OTP for your next transaction is ${encryptedNewMsg}`);
                    
                        res.writeHead(200, {'Content-Type': 'text/xml'});
                        res.end(twiml.toString());
    
                        client.messages
                        .create({
                        body: `Hello, successful payment of ${amt} from ${senderNumber}!`,
                        to: recipientNum, // Text your number
                        from: '+12565883819', // From a valid Twilio number
                        })
                        .then((message) => console.log(message.sid))
                        .catch(error => console.log(error));
                }
            )
        }


        //verify number and PW

        //verify amt present + does not exceed daily amt
        //send db into "transacting" state
        
    } else if (textData.toString() == "help") {
        console.log("success")
        const twiml = new MessagingResponse();

        // Add a text message.
        const msg = twiml.message(`Formats: \n to transact: pay <<recipient> <amt> <static pw> <encrypted_dynamic_pw> \n to resend OTP: resendOTP`);

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    } else if (textData.toString() == "resendOTP") {
        const sender = await prisma.user.findFirst({
            where: { phoneNumber: senderNumber }
        })
        const encryptedNewMsg = encodePasscode([sender.dynamicPw])
        const twiml = new MessagingResponse();

        // Add a text message.
        const msg = twiml.message(`your new OTP for your next transaction is ${encryptedNewMsg}`);

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());


    }
});

export default smsRouter
