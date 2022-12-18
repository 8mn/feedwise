//  get saved posts of user from reddit api

import { NextApiRequest, NextApiResponse } from 'next'


import { getCookie } from 'cookies-next'





export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const username = getCookie("name", {
        req,
        res,
        maxAge: 60 * 60 * 24,
        httpOnly: true,
    }) as string


    const access_token = getCookie("access_token", {
        req,
        res,
        maxAge: 60 * 60 * 24,
        httpOnly: true,
    }) as string


    const data = await fetch(`https://oauth.reddit.com/user/${username}/saved`, {
        headers: {
            Authorization: `Bearer ${access_token}`,
            content_type: "application/json",
        },
    });

    res.status(200).json(await data.json())
};
