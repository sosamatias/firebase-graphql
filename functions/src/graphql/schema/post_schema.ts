import {Field, ObjectType, InputType} from "type-graphql";

import {
  Length,
  IsEmail,
  IsInt,
  Min,
  Max,
  IsFQDN,
  IsDateString,
} from "class-validator";

@ObjectType()
export class Post {
    @Field()
      id!: string;

    @Field()
      title!: string;

    @Field()
      text!: string;

    @Field()
      rating!: number;

    @Field()
      email!: string;

    @Field()
      site!: string;

    @Field()
      createdAt!: string;
}

@InputType()
export class PostInput {

  @Field()
  @Length(10, 20)
    title!: string;

  @Field()
  @Length(0, 200)
    text!: string;

  @Field()
  @IsInt()
  @Min(0)
  @Max(10)
    rating!: number;

  @Field()
  @IsEmail()
    email!: string;

  @Field()
  @IsFQDN()
    site!: string;

  @Field({nullable: true})
  @IsDateString()
    createdAt?: string;
}
