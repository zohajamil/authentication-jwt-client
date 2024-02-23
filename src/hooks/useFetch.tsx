import { IUser } from "../common/interfaces/User";

interface Options {
    method: string;
    headers: {};
    body: any;
}

const useFetch = (collection: string) => {
    const stub = `${process.env.REACT_APP_BACKEND_URL}${collection}`;
    const accessToken: string = localStorage.getItem('accessToken') ?? ''
    const defaultHeader = {
        Accept: "application/json",
        "Content-Type": "application/json",
        AuthToken: accessToken
    };

    const customFetch = (url: string, method: "POST" | "GET", body: any, headers: any) => {
        const options: Options = {
            method,
            headers,
            body,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        try {
            return fetch(url, options)
                .then((response) => {
                    if (!response.ok) {
                        return response.text().then((text) => {
                            throw new Error(text);
                        });
                    } else {
                        return response.json();
                    }
                })
                .then((data) => {
                    return data;
                })
                .catch((err) => {
                    const error = JSON.parse(err.message).message

                    throw new Error(error)
                });
        } catch (err) {
            console.log(err)
            return new Promise((value) => value)
        }

    };

    const get = (id: string) => {
        const url = `${stub}${id ? `${id}` : ""}`;
        return customFetch(url, "GET", null, defaultHeader);
    };

    const post = (path: string, body: IUser) => {
        const url = `${stub}${path ? `${path}` : ""}`;
        const headers = defaultHeader;
        return customFetch(url, "POST", body, headers);
    };

    return {
        get,
        post,
    };
};
export default useFetch;
