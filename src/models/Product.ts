import mongoose, { Schema,Document } from "mongoose";

interface ProductI{
    name:string;
    price:number;
    category:Schema.Types.ObjectId;
    imageName:string
}

export interface ProductModel extends ProductI,Document<string>{}

const ProductSchema = new Schema({
    name:{
        type:String,
        required:[true,"Missing name"],
        minlength:2,
        maxlength:50
    },
    price:{
        type:Number,
        required:[true,"Missing price"],
        min:1,
        max:10000
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:[true,"Missing category"]
    },
    imageName:{
        type:String,
        required:[true,"Missing imageName"]
    }

},{ versionKey: false,toObject:{virtuals:true}, toJSON: { virtuals: true }, id: false });

// ProductSchema.virtual("category", {
//     ref: "Category", // Which model to create relation to?
//     localField: "category", // Which local filed connects to that relation.
//     foreignField: "_id", // Which foreign filed connects to tha relation.
//     justOne: true // category field should be one object and not array.
   
// });

export default mongoose.model<ProductModel>("Product",ProductSchema,"products");
