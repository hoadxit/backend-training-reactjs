module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      price: Number,
      discountPercentage: Number,
      stock: Number,
      brand: String,
      status: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("products", schema);
  return Product;
};
