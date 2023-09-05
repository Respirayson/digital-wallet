import icons from "./icons"
import { COLORS } from "./theme"

export const featuresData = [
    {
        id: 1,
        icon: icons.reload,
        color: COLORS.purple,
        backgroundColor: COLORS.lightpurple,
        description: "Top Up"
    },
    {
        id: 2,
        icon: icons.send,
        color: COLORS.yellow,
        backgroundColor: COLORS.lightyellow,
        description: "Pay via SMS"
    },
    {
        id: 3,
        icon: icons.wallet,
        color: COLORS.red,
        backgroundColor: COLORS.lightRed,
        description: "History"
    },
    {
        id: 4,
        icon: icons.bill,
        color: COLORS.green,
        backgroundColor: COLORS.lightGray,
        description: "My QR"
    }
]

export const transactionData = [
    {
        id: 1,
        type: "Transfer",
        color: COLORS.red,
        description: "Transfer to 6281234567890",
        amount: "-$500.00",
        date: "14 Sep 2021",
        icon: "logo-usd",
    },
    {
        id: 2,
        type: "Transfer",
        color: COLORS.red,
        description: "Transfer to 6281234567890",
        amount: "-$500.00",
        date: "14 Sep 2021",
        icon: "logo-usd",
    },
    {
        id: 3,
        type: "Top Up",
        color: COLORS.green,
        description: "Top Up from Bank",
        amount: "+$500.00",
        date: "14 Sep 2023",
        icon: "cart-sharp"
    }
]