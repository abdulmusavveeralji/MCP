from fastmcp import FastMCP
import httpx

mcp = FastMCP()

baseUrl = 'https://jsonplaceholder.typicode.com'

@mcp.tool
def get_weather():
    """Get weather information"""
    return "Likely to rain today!"

@mcp.tool
def get_all_posts():
    """Get all posts"""
    return httpx.get(f'{baseUrl}/posts').json()

@mcp.tool
def get_post_by_id(id: int):
    """Get post by id"""
    return httpx.get(f'{baseUrl}/posts/{id}').json()


@mcp.tool
def get_comments_by_post_id(id: int):
    """Get All the comments by post id"""
    return httpx.get(f'{baseUrl}/comments?postId={id}').json()

def main():
    print("Hello from mcp-server!")


if __name__ == "__main__":
    mcp.run(transport="http", host="0.0.0.0", port=8000)
    main()

    
