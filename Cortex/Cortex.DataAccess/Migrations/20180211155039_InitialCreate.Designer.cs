﻿// <auto-generated />
using Cortex.DataAccess;
using Cortex.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace Cortex.DataAccess.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20180211155039_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Cortex.DataAccess.Models.Network", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedDate");

                    b.Property<string>("Description");

                    b.Property<string>("Name")
                        .HasMaxLength(300);

                    b.Property<Guid>("OwnerId");

                    b.Property<Guid>("ReadAccessId");

                    b.Property<Guid>("WriteAccessId");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.HasIndex("ReadAccessId");

                    b.HasIndex("WriteAccessId");

                    b.ToTable("Networks");
                });

            modelBuilder.Entity("Cortex.DataAccess.Models.NetworkAccess", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessMode");

                    b.HasKey("Id");

                    b.ToTable("NetworkAccesses");
                });

            modelBuilder.Entity("Cortex.DataAccess.Models.NetworkUserAccess", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("NetworkAccessId");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("NetworkAccessId");

                    b.HasIndex("UserId");

                    b.ToTable("NetworkUserAccesses");
                });

            modelBuilder.Entity("Cortex.DataAccess.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("Name")
                        .HasMaxLength(200);

                    b.Property<string>("PasswordHash")
                        .IsRequired();

                    b.Property<string>("Salt")
                        .IsRequired();

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Cortex.DataAccess.Models.Network", b =>
                {
                    b.HasOne("Cortex.DataAccess.Models.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Cortex.DataAccess.Models.NetworkAccess", "ReadAccess")
                        .WithMany()
                        .HasForeignKey("ReadAccessId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Cortex.DataAccess.Models.NetworkAccess", "WriteAccess")
                        .WithMany()
                        .HasForeignKey("WriteAccessId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Cortex.DataAccess.Models.NetworkUserAccess", b =>
                {
                    b.HasOne("Cortex.DataAccess.Models.NetworkAccess", "NetworkAccess")
                        .WithMany()
                        .HasForeignKey("NetworkAccessId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("Cortex.DataAccess.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}
