import axios from 'axios';

interface Page {
    access_token: string;
    category: string;
    category_list: Array<{ id: string; name: string }>;
    name: string;
    id: string;
    tasks: Array<string>;
}

interface PagesResponse {
    data: Page[];
    paging: {
        cursors: {
            before: string;
            after: string;
        };
    };
}

async function getPageAccessToken(userToken: string, pageId: string): Promise<string> {
    const url = `https://graph.facebook.com/me/accounts?access_token=${userToken}`;

    try {
        const response = await axios.get<PagesResponse>(url);
        const pages = response.data.data;
        const page = pages.find((page: Page) => page.id === pageId);
        if (page) {
            return page.access_token;
        } else {
            return '';
        }
    } catch (error) {
        throw new Error(`Error fetching page access token: ${error}`);
    }
}

async function postToFacebook(userToken: string, pageId: string, message: string): Promise<void> {
    try {
        const pageAccessToken = await getPageAccessToken(userToken, pageId);
        if (!pageAccessToken) {
            new Error('No access token found');
        }

        const url = `https://graph.facebook.com/v20.0/${pageId}/feed`;

        const data = {
            message: message,
            access_token: pageAccessToken
        };

        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("This is response", response.data);
    } catch (error) {
        console.error('Error posting to Facebook:', error);
    }
}