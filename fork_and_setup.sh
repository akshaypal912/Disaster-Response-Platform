#!/bin/bash
set -e

echo "=================================================="
echo "🔱 FORKING AND CLONING TEAMMATE REPOSITORY"
echo "=================================================="

# 1. Ensure gh cli is authenticated
if ! gh auth status &>/dev/null; then
    echo "🔑 Please authenticate your GitHub CLI first:"
    gh auth login
fi

# 2. Get the repository name
read -p "Enter your teammate's repository name: " repo_name

if [ -z "$repo_name" ]; then
    echo "❌ Repository name cannot be empty!"
    exit 1
fi

upstream_repo="akshaypal912/$repo_name"

# 3. Fork the repository using GitHub CLI
echo -e "\n🔱 Forking $upstream_repo to your account..."
gh repo fork "$upstream_repo" --clone=true

# The fork command automatically clones the repo into a folder with the repository's name.
cd "$repo_name"

# 4. Track upstream changes (your teammate's original repository)
echo -e "\n🔗 Configuring 'upstream' remote pointing to the original repo..."
git remote add upstream "https://github.com/$upstream_repo.git" || echo "Upstream remote already exists."
git remote -v

# 5. Assign issues to yourself on the parent repository
echo -e "\n🙋 Assigning issues 1 through 11 to you..."
for issue in {1..11}; do
    echo "Assigning Issue #$issue..."
    # Using the -R flag tells gh to assign the issues on your teammate's original repository
    gh issue edit "$issue" -R "$upstream_repo" --add-assignee "@me" || echo "⚠️ Issue #$issue could not be assigned."
done

echo -e "\n=================================================="
echo "✅ Forked, Cloned, and Issues Assigned!"
echo "📂 You are now inside the project directory: $(pwd)"
echo "👉 Type 'ls -la' to see the project files so we can fix them!"
echo "=================================================="
