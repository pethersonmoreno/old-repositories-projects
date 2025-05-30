export default (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "SQS event processed.",
            input: event
        })
    };

    console.log("event: ", JSON.stringify(event));

    var body = event.Records[0].body;
    console.log("text: ", JSON.parse(body).text);

    callback(null, response);
};
