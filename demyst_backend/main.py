from fastapi import FastAPI
from typing import List, Dict
from provider import balance_sheet_provider
from schemas import *
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/application_data")
async def initiate_application(data: LoanApplicationData):
    balance_sheet = balance_sheet_provider()
    total_profit_or_loss = sum(entry["profitOrLoss"]
                               for entry in balance_sheet)
    total_asset_value = sum(entry["assetsValue"] for entry in balance_sheet)
    average_asset_value = total_asset_value / len(balance_sheet)

    application_data = {
        "name": data.name,
        "business_name": data.business_name,
        "email": data.email,
        "company_id": data.company_id,
        "reporting_date": data.reporting_date,
        "account_names": data.account_names,
        "account_balances": data.account_balances,
        "asset_currency": data.asset_currency,
        "loan_amount": data.loan_amount,
        "accounting_partner": data.accounting_partner,
        "exchange_rate": data.exchange_rate,
        "accounting_period_start": data.accounting_period_start,
        "accounting_period_end": data.accounting_period_end
    }
    application_data["total_profit_or_loss"] = total_profit_or_loss
    application_data["average_asset_value"] = average_asset_value

    # Process application_data as needed
    return {"data": application_data, "balance_sheet": balance_sheet}


@app.get('/demo_balance_sheet', response_model=List[BalanceSheet])
def get_demo_balance_sheet():
    return balance_sheet_provider()


def calculate_totals(balance_sheet: List[Dict[str, float]]) -> Dict[str, float]:
    total_profit_or_loss = 0
    total_assets_value = 0

    for entry in balance_sheet:
        total_profit_or_loss += entry['profitOrLoss']
        total_assets_value += entry['assetsValue']
        average_assets_value = total_assets_value / len(balance_sheet)

    return {
        'total_profit_or_loss': total_profit_or_loss,
        'total_assets_value': total_assets_value,
        'average_assets_value': average_assets_value
    }


@app.post('/submit_application')
def submit_application(data: SubmitApplicationData):
    preAssessment = 20
    if data.profit_or_loss_summary > 0 and data.assets_summary > data.loan_amount:
        preAssessment = 100
    elif data.profit_or_loss_summary > 0:
        preAssessment = 60

    submission_data = {
        'business_name': data.business_name,
        'year_established': data.year_established,
        'profit_or_loss_summary': data.profit_or_loss_summary,
        'preAssessment_value': preAssessment,
    }
    return submission_data
