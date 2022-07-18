import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from querywiki.logic import summary, search, suggest, page
from config import settings


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
async def root():
    return {"mes": "Wikipedia API"}


@app.get("/summary/{name}")
async def wiki_summary(name: str):
    res = summary(name)
    print(res)
    if res == "cannot find":
        raise HTTPException(status_code=400, detail="Item not found")
    return res


@app.get("/search/{name}")
async def wiki_search(name: str):
    res = search(name)
    print(res)
    if res == "cannot find":
        raise HTTPException(status_code=400, detail="Item not found")
    return res


@app.get("/suggest/{name}")
async def wiki_suggest(name: str):
    res = suggest(name)
    print(res)
    if res == "cannot find":
        raise HTTPException(status_code=400, detail="Item not found")
    return res


@app.get("/page/{name}")
async def wiki_page(name: str):
    res = page(name)
    print(res)
    if res == "cannot find":
        raise HTTPException(status_code=400, detail="Item not found")
    return res

if __name__ == "__main__":
    uvicorn.run(app, port=settings.PORT, host="0.0.0.0")