module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      class: String,
      code: String,
      ISIN: String,
      company: String,
      company_name: String,
      country: String,
      currency: String,
      display_exchange: String,
      display_master_code: String,
      display_name: String,
      origin_symbol: String,
      status: String,
      symbol: String,
      type: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Symbol = mongoose.model("symbol", schema);
  return Symbol;
};
