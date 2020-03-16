exports.checkBody = (req, res, next) => {
    const body = req.body
    console.log(body);
    
    if (!body.name || !body.price) {
        return res.status(400).json({"message": "name and price field must not be empty"})
    }
    next()
}