import { defineField, defineType } from "sanity"

export const products = defineType({
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        defineField({
            name: 'id',
            title: 'Product Id',
            type: 'number',
            readOnly: true,
            initialValue: async(__, context) => {
                const query = '*[_type == "products"] | order(id desc)[0]'
                const lastId = await context.getClient({ apiVersion: '2025-01-17' }).fetch(query)

                return lastId?.id ? lastId.id + 1 : 1
            }
        }),
        defineField({
            name: 'productName',
            title: 'Product Name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'defaultImage',
            title: 'Default Image',
            type: 'image',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'stock',
            title: 'Stock available',
            type: 'string',
            options: {
              list: [
                {title: 'True', value: 'true'},
                {title: 'False', value: 'false'},
              ],
              layout: 'radio'
            },
            validation: Rule => Rule.required()
            // name: 'stock',
            // title: 'Stock Available',
            // type: 'checklist'
            // validation: Rule => Rule.required()
        }),
        defineField({
            name: 'flavors',
            title: 'Flavors',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({name: 'flavorName', title: 'Flavor Name', type: 'string', validation: Rule => Rule.required()}),
                        defineField({name: 'flavorImage', title: 'Flavour Image', type: 'image', validation: Rule => Rule.required()}),
                        defineField({name: 'flavorStock', title: 'Flavor Stock Available', type: 'string', options: {list: [{title: 'True', value: 'true'}, {title: 'False', value: 'false'}]}})
                    ]
                }
            ]
        })
    ]
}) 