import { request } from "express";
import supertest from "supertest"; 
import app from './app'

describe("POST / items",()=>{
    describe("given a name , price , unit and img",  ()=>{
        test('should respond with and status code 200',async () => {
            const response = await request(app).post("/items").send({
                name :"name",
                unit : "unit",
                price : "price",
                image : "image"
            })
             expect(res.statusCode).toBe(200)
        })
        test('should respond with and status code 200',async () => {
            const response = await request(app).post("/items").send({
                name :"name",
                unit : "unit",
                price : "price",
                image : "image"
            })
             expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test('response has itemId ',async () => {
            const response = await request(app).post("/items").send({
                name :"name",
                unit : "unit",
                price : "price",
                image : "image"
            })
            expect(response.body.itemId).toBeDefined()
        })
    })

    describe("when one of the elements is missing",()=>{
        test('should respond with a status code 400 ',async () => {
            const response = await request(app).post("/items").send({

            })
            expect(response.statusCode).toBe(400)
        })
        
        
    })
})