from pydantic import BaseModel
from datetime import date


class BalanceSheet(BaseModel):
    year: int
    month: int
    profitOrLoss: int
    assetsValue: int

    class Config:
        orm_mode = True


class LoanApplicationData(BaseModel):
    name: str
    business_name: str
    email: str
    company_id: str
    reporting_date: date
    account_names: str
    account_balances: float
    asset_currency: str
    loan_amount: float
    accounting_partner: str
    exchange_rate: float
    accounting_period_start: date
    accounting_period_end: date


class LoanApplicationOutput(BaseModel):
    name: str
    business_name: str
    email: str
    company_id: str
    reporting_date: date
    account_names: str
    account_balances: float
    asset_currency: str
    loan_amount: float
    accounting_partner: str
    exchange_rate: float
    accounting_period_start: date
    accounting_period_end: date

    class Config:
        orm_mode = True


class SubmitApplicationData(BaseModel):
    business_name: str
    year_established: date
    profit_or_loss_summary: float
    assets_summary: float
    loan_amount: float


class SubmitApplicationOutput(BaseModel):
    business_name: str
    year_established: date
    profit_or_loss_summary: float

    class Config:
        orm_mode = True
