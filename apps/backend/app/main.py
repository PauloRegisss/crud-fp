from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

ARQ_TREINOS = os.path.join(BASE_DIR, "data", "treinos.txt")
ARQ_EXERCICIOS = os.path.join(BASE_DIR, "data", "exercicios.txt")
ARQ_METAS = os.path.join(BASE_DIR, "data", "metas.txt")
ARQ_EVOLUCAO = os.path.join(BASE_DIR, "data", "evolucao.txt")

def dir_failsafe():
    os.makedirs(os.path.join(BASE_DIR, "data"), exist_ok=True)


def save_treinos(treinos):
    dir_failsafe()

    with open(ARQ_TREINOS, "w", encoding="utf-8") as f:
        for c in treinos:
            linha = "|".join([
                c.get("nome", ""),
                c.get("tipo", ""),
                c.get("data", ""),
                c.get("duracao", ""),
                c.get("objetivo", ""),
                c.get("meta", "")
            ])

            f.write(linha + "\n")

def load_treinos():
    dir_failsafe()

    treinos = []
    if not os.path.exists(ARQ_TREINOS):
        return treinos

    with open(ARQ_TREINOS, "r", encoding="utf-8") as f:
        for linha in f:
            data = linha.strip().split("|")

            if len(data) >= 4:
                treinos.append({
                    "nome": data[0],
                    "tipo": data[1],
                    "data": data[2],
                    "duracao": data[3],
                    "objetivo": data[4] if len(data) > 4 else "",
                    "meta": data[5] if len(data) > 5 else ""
                })
    return treinos

def save_exercicios(exercicios):
    dir_failsafe()

    with open(ARQ_EXERCICIOS, "w", encoding="utf-8") as f:
        for c in exercicios:
            linha = "|".join([
                c.get("nome", ""),
                c.get("treino", ""),
                c.get("modo", ""),
                str(c.get("series", 0)),
                str(c.get("repeticoes", 0)),
                str(c.get("tempo", 0)),
                str(c.get("distancia", 0))
            ])

            f.write(linha + "\n")

def load_exercicios():
    dir_failsafe()

    exercicios = []
    if not os.path.exists(ARQ_EXERCICIOS):
        return exercicios
    
    with open(ARQ_EXERCICIOS, "r", encoding="utf-8") as f:
        for linha in f:
            data = linha.strip().split("|")
            
            if len(data) >= 7:
                exercicios.append({
                    "nome": data[0],
                    "treino": data[1],
                    "modo": data[2],
                    "series": data[3],
                    "repeticoes": data[4],
                    "tempo": data[5],
                    "distancia": data[6]
                })

    return exercicios

@app.get("/treinos")
async def get_treinos():
    return load_treinos()

@app.post("/treinos", status_code=201)
async def post_treino(data: dict = Body(...)):
    if not data.get("nome"):
        raise HTTPException(status_code=400, detail="Nome obrigatório")

    treinos = load_treinos()
    treinos.append({
        "nome": data.get("nome", ""),
        "tipo": data.get("tipo", ""),
        "data": data.get("data", ""),
        "duracao": data.get("duracao", ""),
        "objetivo": data.get("objetivo", ""),
        "meta": data.get("meta", "")
    })
    save_treinos(treinos)

    return {"ok": True}

@app.put("/treinos/{nome}")
async def edit_treino(nome: str, data: dict = Body(...)):
    treinos = load_treinos()

    for c in treinos:
        if c["nome"] == nome:
            c["tipo"] = data.get("tipo", c["tipo"])
            c["data"] = data.get("data", c["data"])
            c["duracao"] = (data.get("duracao", c["duracao"]))
            c["objetivo"] = data.get("objetivo", c["objetivo"])
            c["meta"] = data.get("meta", c["meta"])
            save_treinos(treinos)
            return {"ok": True}
        
    raise HTTPException(status_code=404, detail="Treino não encontrado")

@app.delete("/treinos/{nome}")
async def delete_treino(nome: str):
    treinos = load_treinos()
    filtered_treinos = [c for c in treinos if c["nome"] != nome]

    if len(filtered_treinos) == len(treinos):
        raise HTTPException(status_code=404, detail="Treino não encontrado")
    
    save_treinos(filtered_treinos)

    exercicios = load_exercicios()
    save_exercicios([e for e in exercicios if e["treino"] != nome])

    return {"ok": True}

@app.get("/exercicios")
async def get_exercicios(treino: str = None):
    exercicios = load_exercicios()
    if treino:
        exercicios = [e for e in exercicios if e["treino"] == treino]
    
    return exercicios

@app.post("/exercicios")
async def post_exercicios(data: dict = Body(...)):
    if not data.get("nome"):
        raise HTTPException(status_code=400, detail="Nome obrigatório")
    
    exercicios = load_exercicios()
    exercicios.append({
        "nome": data.get("nome", ""),
        "treino": data.get("treino", ""),
        "modo": data.get("modo", "series"),
        "series": str(data.get("series", 0)),
        "repeticoes": str(data.get("repeticoes", 0)),
        "tempo": str(data.get("tempo", 0)),
        "distancia": str(data.get("distancia", 0))
    })
    save_exercicios()

    return {"ok": True}

@app.put("/exercicios")
async def edit_exercicios(nome: str, data: dict = Body(...)):

@app.delete("/exercicios")
async def delete_exercicios(nome: str):