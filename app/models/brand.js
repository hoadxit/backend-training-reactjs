module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Brand = mongoose.model("brand", schema);
  return Brand;
};
