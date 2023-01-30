const { Wallet } = require("../models/wallet.model");
const walletController = {};
const { Coins } = require("../models/coins.model");

walletController.getAllWallets = async (req, res) => {
  const response = await Wallet.findAll()
    .then((data) => {
      const res = { error: false, data: data };
      return res;
    })
    .catch((error) => {
      const res = { error: true, message: error };
      return res;
    });
  res.json(response);
};

walletController.getWalletByHexacode = async (req, res) => {
  try {
    const { hex_code } = req.params;
    const response = await Wallet.findOne({
      where: { hexacode_user: hex_code },
    })
      .then(async (data) => {
        const detail = await Coins.findAll({
          where: { walletId: data.dataValues.wallet_id },
        })
          .then((data) => {
            const res = { error: false, data: data };
            return res;
          })
          .catch((error) => {
            const res = { error: true, message: error };
            return res;
          });

        const res = { error: false, wallet: data, coins: detail };
        return res;
      })
      .catch((error) => {
        const res = { error: true, message: error };
        return res;
      });
    res.json(response);
  } catch (e) {
    console.log(e);
  }
};

walletController.updateWallet = async (req, res) => {
  try {
    const { hexaCode } = req.params;

    const hexaWallet = await Wallet.findOne({
      where: { hexacode_user: hexaCode },
    }).then(async (data) => {
      let result = 0;
      if (data) {
        result =
          parseFloat(data.dataValues.balance) + parseFloat(req.body.balance);
        const response = await Wallet.update(
          { balance: result },
          {
            where: { hexacode_user: hexaCode },
          }
        )
          .then((data) => {
            const res = {
              error: false,
              data: data,
              message: "Wallet actualizada",
            };
            return res;
          })
          .catch((error) => {
            const res = { error: true, message: error };
            return res;
          });
        return response;
      }
    });

    res.json(hexaWallet);
  } catch (err) {
    console.log(err);
  }
};

module.exports = walletController;
