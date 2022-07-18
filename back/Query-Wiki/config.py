from pydantic import BaseSettings


class Settings(BaseSettings):
    PORT: int = 8080



settings = Settings()