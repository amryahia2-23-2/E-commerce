export const ReviewType = {
  name: "review",
  type: "document",
  title: "Review",
  fields: [
    {
      name: "product",
      type: "reference",
      to: [{ type: "product" }],
      title: "Product",
    },
    {
      name: "name",
      type: "string",
      title: "User Name",
    },
    {
      name: "rating",
      type: "number",
      title: "Rating (1-5)",
    },
    {
      name: "comment",
      type: "text",
      title: "Comment",
    },
  ],
};