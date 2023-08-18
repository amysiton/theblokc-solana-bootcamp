use anchor_lang::prelude::*;

declare_id!("3SdDNaDr95nakWywg6ArYrDD6GPxi41WhztxYqrBHJJh");

#[program]
pub mod dapp_anchor {
    use super::*;

    pub fn add_post(ctx: Context<AddPost>, _content: String, _date: String) -> Result<()> {
        let post_account = &mut ctx.accounts.post_account;

        post_account.authority = ctx.accounts.authority.key();
        post_account.content = _content;
        post_account.date = _date;
        
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction()]
pub struct AddPost<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(init, payer=authority, space = 8 + std::mem::size_of::<PostAccount>() )]
    pub post_account: Account<'info, PostAccount>,

    pub system_program: Program<'info, System>,
}


#[account]
pub struct PostAccount {
    pub authority: Pubkey,
    pub content: String,
    pub date: String,
}
