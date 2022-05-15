module.exports = async function (context, input) {
    var documents = context.bindings.documents;
    if (documents.length > 0) {
        context.res = {
            status: 200,
            body: documents
        };
    } else {
        context.res = {
            status: 404,
            body: "No article found"
        };
    }
};