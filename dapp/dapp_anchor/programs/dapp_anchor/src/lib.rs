use anchor_lang::prelude::*;

declare_id!("3SdDNaDr95nakWywg6ArYrDD6GPxi41WhztxYqrBHJJh");

#[program]
pub mod dapp_anchor {
    use super::*;

    pub fn add_post(ctx: Context<AddPost>, _content: String, _date: String) -> Result<()> {
        let post_account = &mut ctx.accounts.post_account;

        post_account.content = _content;
        post_account.date = _date;
        
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction()]
pub struct AddPost<'info> {
    #[account(init, payer=authority, space = 9000 )]
    pub post_account: Account<'info, PostAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}


#[account]
pub struct PostAccount {
    pub content: String,
    pub date: String,
}
