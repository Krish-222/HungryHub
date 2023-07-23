const orderModel = require('../model/orderModel');

const getAllOrderData = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await orderModel.findOne({ email });
        if (user) {
            const { orders } = user;
            res.status(200).json({ status: 'success', data: { orders, size: orders.length } });
        }
        else {
            res.status(404).json({ status: "fail", message: "no order placed" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: "fail", message: "internal error" });
    }
}


const storeData = async (req, res) => {
    try {
        let { email, order_data} = req.body;
        const user = await orderModel.findOne({ email });

        if (user) {
            let order=[...order_data]
            const date = new Date().toString();
            order.splice(0, 0, { date });
            const { orders } = await orderModel.findOneAndUpdate({ email }, { $push: { orders: order } });
            res.status(200).json({ status: "success", data: { orders } });
        }
        else {
            //create new user order
            const date = new Date().toString();
            let order=[...order_data];
            order.splice(0, 0, { date });
            let newOrder = new orderModel({ email, orders: [order] });
            let {orders}=await newOrder.save();
            res.status(200).json({ status: "success", data: { orders } });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: "fail", message: "internal error" });
    }
}


module.exports = {
    getAllOrderData,
    storeData
}