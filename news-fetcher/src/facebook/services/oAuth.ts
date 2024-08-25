import axios from 'axios';
import 'dotenv/config';

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || '';
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || '';
const REDIRECT_URI = process.env.REDIRECT_URI || '';
const SCOPE = 'public_profile,email,pages_manage_posts,pages_read_engagement';

interface AccessTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

interface UserProfileResponse {
    id: string;
    name: string;
    email: string;
}

export class FacebookAuthService {
    static getAuthUrl(): string {
        return `https://www.facebook.com/v12.0/dialog/oauth?client_id=${encodeURIComponent(FACEBOOK_APP_ID)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=your-unique-state-param&scope=${encodeURIComponent(SCOPE)}`;
    }

    static async getAccessToken(code: string): Promise<string> {
        const tokenUrl = 'https://graph.facebook.com/v12.0/oauth/access_token';
        const params = {
            client_id: FACEBOOK_APP_ID,
            client_secret: FACEBOOK_APP_SECRET,
            redirect_uri: REDIRECT_URI,
            code,
        };
        try {
            const response = await axios.get<AccessTokenResponse>(tokenUrl, {params});
            return response.data.access_token;
        } catch (error) {
            throw new Error(`Error fetching access token: ${error}`);
        }
    }

    static async getUserProfile(accessToken: string): Promise<UserProfileResponse> {
        const userUrl = 'https://graph.facebook.com/me';
        try {
            const response = await axios.get<UserProfileResponse>(userUrl, {
                params: {
                    access_token: accessToken,
                    fields: 'id,name,email',
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching user profile: ${error}`);
        }
    }
}
