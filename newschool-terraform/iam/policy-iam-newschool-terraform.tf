resource "aws_iam_policy" "policy-iam-newschool-terraform" {
  description = "Utilizado temporariamente pela New School definindo permissões no IAM utilizando o Terraform"
  name        = "policy-iam-newschool-terraform"
  path        = "/"
  policy      = data.aws_iam_policy_document.doc-policy-iam-newschool-terraform.json
}
data "aws_iam_policy_document" "doc-policy-iam-newschool-terraform" {
  statement {
    sid = "VisualEditor0"

    actions = [
      "iam:CreatePolicy",
      "iam:DeletePolicy",
      "iam:CreateRole",
      "iam:GetRole",
      "iam:GetPolicyVersion",
      "iam:PassRole",
      "iam:GetInstanceProfile",
      "iam:GetPolicy",
      "iam:ListPolicyVersions",
      "iam:CreatePolicyVersion",
      "iam:DeletePolicyVersion",
      "iam:ListAttachedRolePolicies",
      "iam:AttachRolePolicy",
    ]

    resources = [
      "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/*",
      "arn:aws:iam::${data.aws_caller_identity.current.account_id}:instance-profile/*",
      "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/*",
    ]
  }
}