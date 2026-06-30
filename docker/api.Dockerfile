FROM python:3.12-slim AS runtime

WORKDIR /app/apps/api
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY apps/api/pyproject.toml ./
RUN pip install --no-cache-dir ".[dev]"
COPY apps/api ./
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
