"""merging two heads

Revision ID: 22b155e31fc4
Revises: b37eb48bba5c, f373adb01357
Create Date: 2023-07-08 23:45:01.382178

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '22b155e31fc4'
down_revision = ('b37eb48bba5c', 'f373adb01357')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
