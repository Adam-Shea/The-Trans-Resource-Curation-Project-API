module.exports = async function (context, input) {
    var documents = context.bindings.documents;
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: documents
    };
};