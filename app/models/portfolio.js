module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      account_id: String,
      account_name: String,
      cash_balance: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Portfolio = mongoose.model("portfolio", schema);
  return Portfolio;
};
