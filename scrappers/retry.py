import aiohttp
import asyncio


async def retry(url, total=4, status_force_list=None, **kwargs):
    if status_force_list is None:
        status_force_list = [429, 500, 502, 503, 504]

    async with aiohttp.ClientSession() as session:
        for _ in range(total):
            try:
                async with session.get(url, **kwargs) as response:
                    if response.status in status_force_list:
                        await asyncio.sleep(1)
                        continue
                    return await response.text()
            except aiohttp.ClientError:
                await asyncio.sleep(1)
        return None
