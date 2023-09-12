export default function getError(err:Error) {

    // On production:
    if(process.env.NODE_ENV==="production") {
        return "Some error occurred, please try again later.";
    }

    // On development:
    return err.message;
}

